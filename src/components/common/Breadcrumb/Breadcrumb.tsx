import { Link, useLocation } from "react-router-dom";

export type BreadcrumbProps = {
  className?: string;
};

export const Breadcrumb = ({ className = "" }: BreadcrumbProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div
      className={`flex w-full justify-center rounded-md p-3 font-poppins text-sm md:text-base lg:justify-start lg:pl-8 ${className}`}
    >
      <ol className="list-reset flex">
        <li className="text-gray-500 hover:text-red-500">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="capitalize">{value}</span>
              ) : (
                <Link
                  to={to}
                  className="capitalize text-gray-500 hover:text-red-500"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;
