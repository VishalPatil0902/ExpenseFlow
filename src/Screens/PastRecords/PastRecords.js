import React,{useState,useEffect} from 'react';
import { View, Text ,Button,ScrollView,TouchableOpacity} from 'react-native';
import "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { doc, setDoc ,getDoc,collection,getDocs} from "firebase/firestore"; 
import { useAuth } from '../../Firebase/AuthContextProvider';
import { ArrowPathRoundedSquareIcon} from 'react-native-heroicons/solid'

const PastRecords = () => {

  const { user } = useAuth(); 

  const [data,setdata]=useState(null);
  const [refresh,setrefresh]=useState(false);

  useEffect(() => {
    const fetchData = async (user) => {
      console.log("Fetching data for user:", user.email);
      const path = `/Employees/${user.email}`;

      try {
        const docSnapshot = await getDoc(doc(db, path));
        const userData = docSnapshot.data();

        if (userData && userData.Receiptdetails) {
          setdata(userData.Receiptdetails);
          // console.log("data ---->", userData.Receiptdetails);
        } else {
          console.log("array not found in user data");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(user);
  }, [refresh]);


  return (
    <ScrollView className='bg-[#EAECF9] mb-20'>
    <View className='flex-row mt-5 items-center ml-4 mr-4'>
      <Text className='text-2xl font-semibold text-center mr-16 ml-16'>Past Request</Text>
       
      <View className='rounded-lg bg-white inline-block w-9'>
            <TouchableOpacity><ArrowPathRoundedSquareIcon color="#ff7754" size={35} onPress={()=>setrefresh(!refresh)}/></TouchableOpacity>
      </View>  
    </View>
    
      <View className='ml-4 mr-4 flex-row justify-evenly pl-4 pr-4 mt-8'>
          
          <View className='flex-row items-center'>
              <View className='p-2 w-2 h-2 bg-green-400 rounded-full flex mr-2'></View>
              <Text className='font-bold'>Accepted</Text>
          </View>

          <View className='flex-row items-center'>
              <View className='p-2 w-2 h-2 bg-yellow-400 rounded-full flex mr-2'></View>
              <Text className='font-bold'>Pending</Text>
          </View>

          <View className='flex-row items-center'>
              <View className='p-2 w-2 h-2 bg-red-400 rounded-full flex mr-2'></View>
              <Text className='font-bold'>Rejected</Text>
          </View>


      </View>
      <View className='bg-blue-400 rounded-lg h-1 ml-4 mr-4 mt-10'  style={{elevation:10,shadowColor:'blue'}}></View>

      {/* <Button title='refresh' color='blue' onPress={()=>setrefresh(!refresh)}/> */}
      {data && data.map((dataItem, index) => {
    return (
        <View className='rounded-lg mt-5 mb-5 ml-4 mr-4' key={index}>
            <TouchableOpacity className="text-[#f5ddd7] rounded-md  bg-white justify-center p-1" style={{ elevation: 10, shadowColor: 'blue' }}>
                <View className={`p-3 rounded-t-xl ${dataItem.status === 'accepted' ? 'bg-green-400' : dataItem.status === 'rejected' ? 'bg-red-400' : dataItem.status === 'Pending' ? 'bg-yellow-400' : ''}`}></View>
                <View className='p-2'><Text className='font-semibold'>Application ID : <Text className='text-gray-500'>{dataItem.id}</Text></Text></View>
                <View className='p-2'><Text className='font-semibold'>Restaurant Name : <Text className='text-gray-500'>{dataItem.name}</Text></Text></View>
                <View className='p-2'><Text className='font-semibold'>Address : <Text className='text-gray-500'>{dataItem.address}</Text></Text></View>
                <View className='p-2'><Text className='font-semibold'>Date : <Text className='text-gray-500'>{dataItem.date}</Text></Text></View>
                <View className='p-2'><Text className='font-semibold'>GSTIN : <Text className='text-gray-500'>{dataItem.gstin}</Text></Text></View>
                <View className='p-2'><Text className='font-semibold'>Total : <Text className='text-gray-500'>{dataItem.total}</Text></Text></View>
                {dataItem.reason && <View className='p-2'><Text className='font-semibold'>Reason (Ignore if accepted) : <Text className='text-gray-500'>{dataItem.reason}</Text></Text></View>}
            </TouchableOpacity>
        </View>
    );
})}

    </ScrollView>
  );
};

export default PastRecords;