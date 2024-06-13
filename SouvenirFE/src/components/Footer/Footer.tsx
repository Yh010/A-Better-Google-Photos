const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        &copy; 2024 A limbu mirchi production
      </p>
      <div className="sm:ml-auto flex gap-4 sm:gap-6">
        <p className="text-xs hover:underline underline-offset-4">
          Contact the team
        </p>
        <p className="text-xs hover:underline underline-offset-4">Privacy</p>
      </div>
    </footer>
  );
};

export default Footer;
