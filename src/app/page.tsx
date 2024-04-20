import ResizableBox from "./_components/ResizableBox";
import AddDataForm from "./_components/AddDataForm";
import Image from "next/image";
export default function Home() {
  return (
    <div className="p-5">
      <div className="grid md:grid-cols-[1fr_4fr] gap-6">
        <ResizableBox>
          <div>
            
          </div>
        </ResizableBox>
        <ResizableBox>
          <div>
            <Image
              src="/bgimg.png"
              fill
              priority={true}
              alt={"Background Image"}
            />
          </div>
        </ResizableBox>
      </div>
      <div className="mt-5">
        <ResizableBox>
          <div className="flex flex-col justify-center items-center space-y-5">
            <h1 className="text-center text-6xl font-bold underline">
              ADD TASK
            </h1>
            <AddDataForm />
          </div>
        </ResizableBox>
      </div>
    </div>
  );
}
