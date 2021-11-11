import Head from 'next/head';
import { Card } from '../components/Card';
import { gql, useQuery } from '@apollo/client';

const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

export default function Home() {
  const { data, error, loading, fetchMore:any } = useQuery(AllLinksQuery, {
    variables: { first: 2 },
  });

  if (loading) return <p>Loading......</p>;

  if (error) return <p>Oops, something went wrong {error.message}</p>;
  console.log(error);

  const { hasNextPage, endCursor } = data.links.pageInfo;

  return (
    <div>
      <Head>
        <title>NZ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({ node }) => (
            <Card
              title={node.title}
              category={node.category}
              url={node.url}
              id={node.id}
              description={node.description}
              imageUrl={node.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore:any({
                variables: { after: endCursor },
                updateQuery: (prevResult:any, { fetchMoreResult } : any)=> {
                  if(fetchMoreResult){
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ];
                  return fetchMoreResult;
                }
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            End
          </p>
        )}
      </div>
    </div>
  );
}