import styles from "./page.module.css";

const people = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
  }, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
  }, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
  }, {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',  
  }, {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
  }];
  
  const PeopleList = () => {
    return (
      <div>
        <h2>People</h2>
        {console.log("List of Persons")}
        <table>
          <tr>
            <th>Name</th>
            <th>Profession</th>
          </tr>
          {people.map( (p, i) => <tr key={p.id}>
                              <td className={styles.td}>{i+1}: {p.name}</td>
                              <td className={styles.td}>{p.profession}</td>
                              </tr>
                    )}
        </table>
      </div>
    )
  }

  export default PeopleList;