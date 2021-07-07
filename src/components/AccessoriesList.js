import { useQuery, gql } from '@apollo/client';
import Accessory from "./Accessory";

const ACCESSORIES = gql`
query getAccessories {
  getAccessories {
    _id
    title
    icon
    slug
  }
}
`;

function AccessoriesList() {

    const { loading, error, data } = useQuery(ACCESSORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {
                data.getAccessories.map(({ title, icon, slug }) =>(
                    <Accessory title={title} icon={icon} slug={slug}/>
                ))
            }
        </div>
    )
}

export default AccessoriesList;
