import fs from "fs";
import csvParser from "csv-parser";

export async function csvHandlerUseCase(query : string){
    const searchResults: any[] = [];
    const csvFolder = "./uploads";

    const files = fs.readdirSync(csvFolder).filter(file => file.endsWith(".csv"));

    for (const file of files) {
      const filePath = `${csvFolder}/${file}`;
      const fileData = await readCSVFile(filePath);

      fileData.forEach((row: any) => {
        Object.entries(row).forEach(([columnName, value]) => {
          if (value.toString().toLowerCase().includes(query)) {
            searchResults.push({columnName , value, file: filePath ,other : row});
          }
        });
      });
    }

    return searchResults

}

export async function readCSVFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
  
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row: any) => {
          results.push(row);
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error: any) => {
          reject(error);
        });
    });
  }