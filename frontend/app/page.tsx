import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative">
        <Image

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
