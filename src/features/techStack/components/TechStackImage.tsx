import Image from 'next/image';

interface TechStackImageProps {
  stackName: string;
  width?: number;
  height?: number;
}

const TechStackImage = ({ stackName }: TechStackImageProps) => {
  const fileName = stackName.toLowerCase().replace('.', '');

  return (
    <div className='relative inline-block pc:w-[32px] pc:h-[32px] tablet:w-[28px] tablet:h-[28px] mobile:w-[24px] mobile:h-[24px]'>
      <Image
        aria-hidden={true}
        src={`/images/tech/${fileName}.svg`}
        alt={stackName}
        fill
        // sizes={calcImageSizes('24px', '28px', '32px')}
      />
    </div>
  );
};

export default TechStackImage;
