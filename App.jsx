import { useQuery } from '@tanstack/react-query'
import './App.css'
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";

function App() {

  const fetchUsers = async () => {
    const productsData = await fetch("https://api.pujakaitem.com/api/products")

    if (!productsData.ok) {
      throw new Error("Unable to fetch the data")
    }

    return productsData.json()
    
  } 

  // use query hook: 

  const {data , isLoading , isError , error} = useQuery({
    queryKey: ["products"] , 
    queryFn: fetchUsers,
    // staleTime: 4000  => we do not have to use this scaleTime , if we want to use Refetching technique in useQuery hook
    refetchInterval: 2000, // enter the time you want to refetch API data again
    refetchIntervalInBackground: true  
  })

  if (isLoading) return     <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>

  if (isError)  return <p>Error: {error.message}</p>;
  
  console.log(data)

  return (
    <>
      <div className='container' >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4' >
          {data?.map(item => 
              <div key={item?.id} className="rounded-2xl border ">
        <a className="block relative h-48 rounded overflow-hidden">
          <img alt="ecommerce-product" className="object-cover object-center w-full h-full block rounded-t-2xl " src= {item?.image} />
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item?.category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item?.name}</h2>
          <p className="mt-1">{item?.price}</p>
          <h5 className="text-gray-900 title-font text-sm font-medium p-2 text-muted-foreground">{item?.description}</h5>
        </div>

            <div className='flex gap-4 mx-5 items-center' >
            <h2 className='font-bold' >
               Colors:
            </h2>
              {
                item?.colors?.map((color , idx)=> <div key={idx} className='rounded-full my-6 w-3 h-3' style={{backgroundColor: color, border: `2px solid ${color}` }} > </div>)
              }
            </div>

      </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
