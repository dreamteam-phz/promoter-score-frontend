import Cell from "../cell/Cell";
const Row = ({name,question,link}) => {
    return (
        <tr>
            <Cell name={name} />
            <Cell question={question}/>
            <Cell link={link}/>
        </tr>
    );
};

export default Row;