import Row from "./row/Row";
import styles from "./Table.module.css"

const Table = ({selectSurvey}) => {
    return (
        <div className={styles.tableContainer}>
        <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Question</th>
                  <th>Link</th>
              </tr>
          </thead>
          <tbody>
            {selectSurvey.map( (survey) => (
              <Row 
                key={survey._id}
                name={survey.name}
                question={survey.question}
                link={`http://localhost:3000/${survey._id}`}
              />  
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Table;