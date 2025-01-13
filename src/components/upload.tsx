'use client';

import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

interface UploadFileProps {
	type: 'script' | 'media';
	data?: string[];
	setUploadData?: Function;
}

const handleUploadedFile = async (file: any, setUploadData: Function) => {
	const res = await fetch(file.cdnUrl);
	const text = await res.text();
	console.log('cdn -> ', text);
	setUploadData(text);
};

const handleMediaUpload = async (
	file: any,
	setUploadData: Function,
	data: string[]
) => {
	const fileUrl = file.cdnUrl;
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
					if (type === 'script')
						handleUploadedFile(file, setUploadData as Function);
					else
						handleMediaUpload(
							file,
							setUploadData as Function,
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
