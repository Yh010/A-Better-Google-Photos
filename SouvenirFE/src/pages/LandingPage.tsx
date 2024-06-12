import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import laughingPeople from "../assets/laughingPeople.png";
import UploadComponent from "../components/UploadButton/UploadButton";
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Capture Your Moments with Ease
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our platform makes it simple to upload and share your photos.
                  Discover new ways to capture and preserve your memories.
                </p>
                <div className="mt-6 space-x-4">
                  <UploadComponent />
                </div>
              </div>
              <img
                src={laughingPeople}
                width="550"
                height="310"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
