import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import tailwind from "twrnc";
import moment from "moment";

export default function App() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.jsonkeeper.com/b/W694");
        const data = await response.json();
        setProjectData(data.data.Records);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateDaysLeft = (startDate, endDate) => {
    const start = moment(startDate, "DD/MM/YYYY");
    const end = moment(endDate, "DD/MM/YYYY");

    return end.diff(start, "days");
  };

  return (
    <View style={tailwind` bg-white mb-20`}>
      <View style={tailwind`mx-1 mt-10  `}>
        <Text
          style={tailwind`mb-2 text-2xl font-bold tracking-tight text-gray-900 mx-2`}
        >
          Record List
        </Text>

        <FlatList
          data={projectData}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item }) => (
            <View
              style={tailwind`max-w-sm  mx-auto w-full mb-1 rounded-tl-lg rounded-tr-lg mb-2`}
            >
              <TouchableOpacity>
                <Image
                  source={{ uri: item.mainImageURL }}
                  style={tailwind` w-full h-60 rounded-tl-lg rounded-tr-lg `}
                />
              </TouchableOpacity>
              <View
                style={tailwind`absolute z-4 bg-white w-60 h-20 top-50 rounded-lg left-2 p-1`}
              >
                <Text
                  style={tailwind`text-lg font-bold tracking-tight text-gray-900 mx-2`}
                >
                  {item.title}
                </Text>
                <Text
                  style={tailwind`text-sm tracking-tight text-gray-900 mx-2`}
                >
                  {item.shortDescription}
                </Text>
              </View>
              <View
                style={tailwind`p-5 bg-[rgb(13,152,186)] flex-row rounded-bl-lg rounded-br-lg`}
              >
                <View>
                  <Text
                    style={tailwind`text-lg font-bold mx-2 mt-8 text-white`}
                  >
                    {item.collectedValue}
                  </Text>
                  <Text style={tailwind`text-lg font-bold mx-2 text-white`}>
                    Funded
                  </Text>
                </View>
                <View>
                  <Text
                    style={tailwind`text-lg font-bold mx-2 mt-8 text-white`}
                  >
                    {item.totalValue}
                  </Text>
                  <Text style={tailwind`text-lg font-bold mx-2 text-white`}>
                    Goals
                  </Text>
                </View>
                <View>
                  <Text
                    style={tailwind`text-lg font-bold mx-2 mt-8 text-white`}
                  >
                    {calculateDaysLeft(item.startDate, item.endDate)}
                  </Text>
                  <Text style={tailwind`text-lg font-bold mx-2 text-white`}>
                    Ends In
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={tailwind`
                    text-sm font-bold mx-2 mt-10 text-[rgb(13,152,186)] px-2 py-1 rounded-lg bg-white ml-10
                  `}
                  >
                    <Text style={tailwind`text-[rgb(13,152,186)] font-bold`}>
                      PLEDGE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
