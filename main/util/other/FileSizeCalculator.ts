import { CalculatedFileSize } from './CalculatedFileSize';

export class FileSizeCalculator {

	public static calculateSizeByte(fileSize : number) : CalculatedFileSize {

		let totalFileSize : number = (1024 * fileSize);

		let calculatedSize : string = totalFileSize.toString();

		let fileSizeUnit : string[] = ["kilobytes" , "kb"];

		if (totalFileSize >= 1024) {

			fileSizeUnit = ["megabytes" , "mb"]; }

		else if (totalFileSize >= 1073741824) {

			fileSizeUnit = ["gigabytes" , "gb"]; }

			return new CalculatedFileSize({'totalFileSize' : totalFileSize , 'calculatedSize' : calculatedSize , 'fileSizeUnit' : fileSizeUnit});

	} 

	public static calculateSizeActual(fileSize : number) : CalculatedFileSize {

		let totalFileSize : number = (1024 * fileSize) / 1024;

		let calculatedSize : string = totalFileSize.toString();

		let fileSizeUnit : string[] = ["kilobytes" , "kb"];

		if (totalFileSize >= 1024) {

			totalFileSize = totalFileSize / 1024;

			calculatedSize = totalFileSize.toFixed(2); }

		else if (totalFileSize >= 1073741824) {

			totalFileSize = totalFileSize / 1024;

			totalFileSize = totalFileSize / 1024;

			calculatedSize = totalFileSize.toFixed(2); }

			return new CalculatedFileSize({'totalFileSize' : totalFileSize , 'calculatedSize' : calculatedSize , 'fileSizeUnit' : fileSizeUnit});

	}

}