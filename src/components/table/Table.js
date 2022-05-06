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
                  <th>url</th>
                  <th>Embeded link format</th>
              </tr>
          </thead>
          <tbody>
            {selectSurvey.map( (survey) => (
              <Row 
                key={survey._id}
                name={survey.name}
                question={survey.question}
                url={`http://localhost:3000/${survey._id}`}
                link={`<iframe src="http://localhost:3000/${survey._id}" frameborder="0" width="100%" height="500px" ></iframe>`}
              />  
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Table;