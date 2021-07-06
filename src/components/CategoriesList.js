import { useQuery, gql } from '@apollo/client';
import Category from "./Category";
import {Link} from "react-router-dom";

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

    return (
        <div>
            {
                data.getCategories.map(({ title, icon }) =>(
                    <Category title={title} icon={icon}/>
                ))
            }
        </div>
    )
}

export default CategoriesList;
