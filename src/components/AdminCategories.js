import {gql, useQuery} from "@apollo/client";
import CreateCategory from "./CreateCategory";
import { useHistory } from "react-router-dom";
import {useState} from "react";

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

function AdminCategories() {

    const { loading, error, data } = useQuery(CATEGORIES);

    const [showCreate, setShowCreate] = useState(false);

    let history = useHistory();

    const handleClick = (category) => {
        history.push({
            pathname: `/admin/categories/${category.slug}`,
            state: {
                category: {category}
            }
        })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <div className="admin-page">
                <h2>Page Admin Catégories</h2>
                {
                    data && data.getCategories ?
                        <table>
                            <thead>
                                <tr>
                                    <th>title</th>
                                    <th>Icon</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.getCategories.map((category) =>(
                                        <tr key={category._id} onClick={() => handleClick(category)}>
                                            <td>{category.title}</td>
                                            <td>{category.icon}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        : ""
                }
                <button onClick={()=>history.push("/admin")}>Retour au menu</button>
            </div>
            <button onClick={() => setShowCreate(true)}>Ajouter une catégorie</button>
            <CreateCategory showCreate={showCreate} onClose={() => setShowCreate(false)}/>
        </div>
    );
}

export default AdminCategories;

