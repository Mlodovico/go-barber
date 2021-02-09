export default interface IProviderStorage {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
