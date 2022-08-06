import axios from "axios";

export default function Profiles({ users }) {
  console.log(users);
  return <div></div>;
}

export async function getServerSideProps() {
  let users = [];
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/students");
      console.log(response);
      users = response.data;
    } catch (e) {
      console.error(e);
    }
  };
  fetchStudents();
  return {
    props: {
      users,
    },
  };
}
