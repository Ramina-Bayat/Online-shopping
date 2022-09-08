import Layout from "../../Layout/Layout";
import { useAuth } from "../../Providers/AuthProvider";
import './profile.css';
const Profile = () => {
  const auth = useAuth();
  return (
    <Layout>
      <div className="profile">
        <p>name : {auth.name}</p>
        <p>email : {auth.email}</p>
      </div>
    </Layout>
  );
};

export default Profile;
