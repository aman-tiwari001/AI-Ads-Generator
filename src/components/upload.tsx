'use client';

import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
//  @typescript-eslint/no-explicit-any
interface UploadFileProps {
	type: 'script' | 'media';
	data?: string | string[];
	setUploadData?: (data: any) => any;
}
// @typescript-eslint/no-explicit-any
const handleUploadedFile = async (
	file: unknown,
	setUploadData: (data: any) => any
) => {
	const res = await fetch((file as { cdnUrl: string }).cdnUrl);
	const text = await res.text();
	console.log('cdn -> ', text);
	setUploadData(text);
};

const handleMediaUpload = async (
	file: unknown,
	setUploadData: (data: any) => any,
	data: string[]
) => {
	const fileUrl = (file as { cdnUrl: string }).cdnUrl;
	setUploadData([...data, fileUrl]);
};

const UploadFile: React.FC<UploadFileProps> = ({
	type,
	data,
	setUploadData,
}) => {
	return (
		<div className='w-full bg-gray-800 p-[2px] rounded-lg'>
			<FileUploaderRegular
				sourceList='local, url, camera, gdrive, gphotos'
				classNameUploader='uc-light uc-purple'
				pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''}
				accept={type === 'script' ? 'text/plain' : '.JPEG,.PNG,.MOV,.MP4'}
				onFileUploadSuccess={(file) => {
					if (type === 'script' && setUploadData)
						handleUploadedFile(file, setUploadData);
					else
						handleMediaUpload(
							file,
							setUploadData as (data: string[]) => void,
							data as string[]
						);
				}}
				multiple={type === 'media' ? true : false}
				className='text-white w-full'
				multipleMax={10}
			/>
		</div>
	);
};

export default UploadFile;
