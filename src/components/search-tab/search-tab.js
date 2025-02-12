import MovieList from "../movie-list/movie-list";

import { Flex, Pagination, Input } from "antd";

export default function SearchTab({ setSearchQuery, onPaginationChange, propsSearchTab, info }) {

  const {error, loading, totalPages, sessionId, page} = propsSearchTab

  const searchMovie = (e) => {
    setSearchQuery(e.target.value);
  };

  const content = (
    <>
      <MovieList info={info} sessionId={sessionId} loading={loading} activeTab='search' />
      <Flex justify="center">
        <Pagination
          total={totalPages}
          pageSize={20}
          showSizeChanger={false}
          current={page}
          onChange={onPaginationChange}
        />
      </Flex>
    </>
  );

  const show = error ? error : content;

  return (
    <>
      <Input
        placeholder="Type to search..."
        defaultValue={""}
        size="large"
        onChange={searchMovie}
      />
      {show}
    </>
  );
}
