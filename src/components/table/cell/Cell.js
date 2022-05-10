const Cell = ({key, name, question, url, link}) => {
    return (
        <td>
          {key} {name} {question} {url} {link}
        </td>
    );
};

export default Cell;