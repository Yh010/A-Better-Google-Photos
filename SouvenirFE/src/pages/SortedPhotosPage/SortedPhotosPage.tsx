import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
export default function SortedPhotosPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Photo Gallery</h1>
          <nav className="flex items-center space-x-4">
            <Link href="#" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="#" className="hover:text-gray-300">
              Individuals
            </Link>
            <Link href="#" className="hover:text-gray-300">
              Albums
            </Link>
            <Link href="#" className="hover:text-gray-300">
              Settings
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Individuals
          </Link>
          <Link underline="hover" color="inherit" href="#">
            John Doe
          </Link>
        </Breadcrumbs>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="John Doe"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  John Doe
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  123 photos
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Jane Smith"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Jane Smith
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  87 photos
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Bob Johnson"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Bob Johnson
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  65 photos
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Sarah Lee"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Sarah Lee
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  92 photos
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Tom Wilson"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Tom Wilson
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  78 photos
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Photo 1"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Photo 1
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  2023-04-15
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Photo 2"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Photo 2
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  2023-04-16
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Photo 3"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Photo 3
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  2023-04-17
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Photo 4"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Photo 4
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  2023-04-18
                </p>
              </div>
            </div>
          </Link>
          <Link href="#" className="group">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Photo 5"
                width={200}
                height={200}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                  Photo 5
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  2023-04-19
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
