import Image from 'next/image';

interface ModalIconProps {
  icon: string;
}
const ModalIcon = ({ icon }: ModalIconProps) => {
  return (
    <div className="relative -z-10 h-fit w-fit">
      <Image src={icon} width={48} height={48} alt="Icon" unoptimized />
      <div className="absolute top-1/2 left-1/2 size-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/80" />
      <div className="absolute top-1/2 left-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/60" />
      <div className="absolute top-1/2 left-1/2 size-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/40" />
      <div className="absolute top-1/2 left-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/20" />
      <div className="absolute top-1/2 left-1/2 size-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/10" />
    </div>
  );
};

export default ModalIcon;
