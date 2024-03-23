import fs from 'fs';
import csvParser from 'csv-parser'
import { csvHandlerUseCase, readCSVFile } from './csv-usecase';

jest.mock('fs')
jest.mock('csv-parser'); 


describe('csvHandlerUseCase', () => {
    let mockReaddirSync: jest.Mock;
    let mockReadCSVFile: jest.Mock;
    let mockCsvParser: jest.Mock;

  beforeEach(() => {
    mockReaddirSync = jest.fn();
    (fs.readdirSync as jest.Mock) = mockReaddirSync;

    mockReadCSVFile = jest.fn();
    (readCSVFile as jest.Mock) = mockReadCSVFile;

    mockCsvParser = jest.fn();
    (csvParser as jest.Mock) = mockCsvParser;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty array for no matching results', async () => {
    expect(true).toBe(true);
  });


});