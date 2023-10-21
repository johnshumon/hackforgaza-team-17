import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative w-full max-h-screen min-h-[calc(100vh-100px)]">
        <div className="absolute h-full w-full top-0 left-0 z-10 from-black to-transparent bg-gradient-to-t opacity-70 flex flex-col justify-end">
          <div className="w-full p-3">
            <div className="text-white font-medium text-4xl">
              Israeli strike on Gaza church
            </div>
          </div>
        </div>
        <Image
          className="absolute h-full w-full object-cover z-[9]"
          alt="sample photo"
          width={1920}
          height={1080}
          src={
            "https://www.reuters.com/resizer/HlRNp-3NVDJyYL2XQwUVTjrrQ3I=/1920x0/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/QU4E4KFZBRMJZHNFXWA464XIFE.jpg"
          }
        />
      </div>
    </div>
  );
}
