import MeetupDetail from "@/components/meetups/MeetupDetail";


function MeetupDetails() {
  return (
    <MeetupDetail 
    image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/800px-Fronalpstock_big.jpg"
    title="The First Meetup"
    address="Some Street 5, Some City"
    description="This is a first meetup!"
    />
  );
}

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            { params: { meetupId: 'm1' } },
            { params: { meetupId: 'm2' } }
        ]
    }
};

export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/800px-Fronalpstock_big.jpg",
                id: "m1",
                title: "A First Meetup",
                address: "Some Street 5, Some City",
                description: "This is a first meetup!"
    }
    },
    revalidate: 10
    };
};

export default MeetupDetails;