import LoadingIcon from 'components/loadingIcon';

const LoadingPage = ({
  width = 180,
  height = 180,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <div className="m-auto flex justify-center align-middle max-w-7xl px-4 sm:px-6 lg:px-8 h-[30rem] lg:h-[50rem]">
      <div className="m-auto max-w-2xl">
        <LoadingIcon width={width} height={height} />
      </div>
    </div>
  );
};

export default LoadingPage;
