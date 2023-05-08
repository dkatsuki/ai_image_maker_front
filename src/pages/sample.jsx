import enviroment from 'modules/enviroment.js';
import TopTemplate from "components/templates/top";
// import queryParser from 'query-string-parser';

const successCallback = async (promise) => {
  const response = await promise.json();
  return(response);
}

const failureCallback = () => {return(false)};

export const getServerSideProps = async (context) => {
  // const resolvedUrl = context.resolvedUrl;
  // const id = context.params.id;
  // const queryString = queryParser.toQuery({name: 'sample'});
  // const query = queryParser.fromQuery(url);
  // const promise = await fetch(addQuery(`${pathPrefix}/article_categories`, {limit: 10, not: {name: 'デッキタイプまとめ'}}));
  const promise = await fetch(`${enviroment.apiOrigin}/test`).then(successCallback).catch(failureCallback);
  const responses = await Promise.all([promise]).then(values => values);
  const is404 = false;

  if ((responses.find(e => e === false)) === false) {
    context.res.statusCode = 500;
  } else if (is404) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      statusCode: context.res.statusCode,
      title: "Sample Home",
      responses: responses
    }
  }
}

const SampleHome = (props) => {
  return (
    <TopTemplate
      title={props.title}
      responses={props.responses}
      statusCode={props.statusCode}
    />)
}

export default SampleHome;