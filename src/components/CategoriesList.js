import { useQuery, gql } from '@apollo/client';
import Category from "./Category";

const CATEGORIES = gql`
query getCategories {
  getCategories {
    _id
    title
    icon
    slug
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
                data.getCategories.map(({ title, icon, slug }) =>(
                    <Category title={title} icon={icon} slug={slug}/>
                ))
            }
        </div>
    )
}

export default CategoriesList;
