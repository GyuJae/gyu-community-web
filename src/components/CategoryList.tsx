import React from "react";
import { useQuery, gql } from "@apollo/client";
import { ReadCategories } from "../__generated__/ReadCategories";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { categoryStateAtom } from "../atoms/category.atom";
import { useNavigate } from "react-router-dom";

export const READ_CATEGORIES_QUERY = gql`
  query ReadCategories {
    readCategories {
      ok
      error
      categories {
        id
        name
      }
    }
  }
`;

const Container = styled.div``;

const CategoryContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const CategoryItem = styled.li`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.color.text};
  font-size: 17px;
  color: ${(props) => props.theme.color.background};
`;

const Outline = styled(motion.div)`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 5px solid ${(props) => props.theme.color.accent};
  border-radius: 50%;
`;

const CategoryList = () => {
  const { loading, data, error } = useQuery<ReadCategories>(
    READ_CATEGORIES_QUERY
  );
  const [selected, setSelected] = useRecoilState(categoryStateAtom);
  const navigate = useNavigate();
  if (error) {
    return <h1 style={{ color: "red" }}>{`${error}`}</h1>;
  }
  return (
    <Container>
      {loading ? (
        "loading..."
      ) : (
        <AnimateSharedLayout>
          <CategoryContainer>
            {data?.readCategories.ok &&
              data.readCategories.categories?.map((category) => (
                <CategoryItem
                  key={category.id}
                  onClick={() => {
                    setSelected({ id: category.id, name: category.name });
                    navigate(`?category=${category.id}`);
                  }}
                >
                  {selected && category.id === selected.id && (
                    <Outline
                      layoutId="outline"
                      className="outline"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  {category.name}
                </CategoryItem>
              ))}
          </CategoryContainer>
        </AnimateSharedLayout>
      )}
    </Container>
  );
};

export default CategoryList;
