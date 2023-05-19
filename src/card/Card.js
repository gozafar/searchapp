import { Card } from 'react-bootstrap'

function BasicExample(props) {
  const { item } = props;
return(
  <>
    
      <Card className='mb-4'>
          <Card.Img variant="top" src={item?.owner?.avatar_url} style={{height:'350px', objectFit: 'cover', objectPosition: 'top left'}}/>
          <Card.Body>
            <Card.Title>{item?.name}</Card.Title>
            <Card.Text style={{minHeight: '200px'}}>
              Repo name : <a href={item?.owner?.html_url} target="_blank" rel="noreferrer"></a>
              <h6>Star: {item?.stargazers_count}</h6>
              <h6>Watchers: {item?.watchers_count}</h6>
              <h6>Language: {item?.language?item?.language:"No language found"}</h6>
              <p class="card__title text--medium">
              Description: 
                 {item?.description?item?.description:"No description found"}
              </p>
            </Card.Text>
          </Card.Body>
      </Card>
  </>
)
}

export default BasicExample;
