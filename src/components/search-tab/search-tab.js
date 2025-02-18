import MovieList from "../movie-list/movie-list";

import { Flex, Pagination, Input } from "antd";

export default function SearchTab({ setSearchQuery, onPaginationChange, propsSearchTab, info }) {

  const {error, totalPages, page, ...rest} = propsSearchTab
  const updatedProps = { ...rest, activeTab: 'search' }; 

  const searchMovie = (e) => {
    setSearchQuery(e.target.value);
  };


  const content = (
    <>
      <MovieList info={info} updatedProps={updatedProps} />
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
