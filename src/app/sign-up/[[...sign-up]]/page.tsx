import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center bg-gray-950 mt-[67.2px] h-[calc(100vh-67.2px)]">
      <SignUp
        forceRedirectUrl={'/generate-ad'}
        appearance={{ variables: { colorPrimary: '#C084FC' } }}
      />
    </div>
  );
};

export default SignUpPage;