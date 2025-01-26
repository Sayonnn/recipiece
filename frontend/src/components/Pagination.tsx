import { useGraphQL } from "../contexts/graphql";

type PaginationProps = {
  navigatePage: (page: number) => void;
  currentPage: number;
  boundary: number;
};

function Pagination({ navigatePage, currentPage, boundary }: PaginationProps) {
  const { recipes } = useGraphQL();
  const pages: number = Math.ceil(recipes.length / boundary);

  return (
    <div className="flex gap-2">
      {Array.from({ length: pages }, (_, i) => {
        return (
          <button
            key={i}
            className={`${
              currentPage === i + 1 ? "bg-orange-200" : "bg-orange-50"
            } p-2 rounded-md`}
            onClick={() => navigatePage(i + 1)}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
