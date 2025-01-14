export const fileDownloader = async (
	generatedVideoUrl: string,
	fileName: string
) => {
	try {
		const a = document.createElement('a');
		a.href = generatedVideoUrl;
    a.target = '_blank';
		a.download = fileName;
    a.style.opacity = '0';
		a.click();
    a.remove();
	} catch (error) {
		console.error('Error downloading the video:', error);
	}
};
