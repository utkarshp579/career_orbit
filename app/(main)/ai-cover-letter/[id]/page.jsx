const CoverLetter = async({ params }) => {
    const id = await params.id; // accessing dynamic page route in id variable
    // console.log(id);

    return <div>CoverLetter: {id} </div>
}

export default CoverLetter