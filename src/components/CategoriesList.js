import { useQuery, gql } from '@apollo/client';
import Category from "./Category";

const CATEGORIES = gql`
query getCategories {
  getCategories {
    _id
    title
    icon
  }
}
`;

function CategoriesList() {

    const { loading, error, data } = useQuery(CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.getCategories.map(({ title, icon }) =>(
        <Category title={title} icon={icon}/>
    ));
}

export default CategoriesList;
