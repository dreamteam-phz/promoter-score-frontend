const Cell = ({key, name, question, link}) => {
    return (
        <td>
          {key} {name} {question} {link}
        </td>
    );
};

export default Cell;