import Cell from "../cell/Cell";
const Row = ({name,question,url,link}) => {
    return (
        <tr>
            <Cell name={name} />
            <Cell question={question}/>
            <Cell url={url}/>
            <Cell link={link}/>
        </tr>
    );
};

export default Row;