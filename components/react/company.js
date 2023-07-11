import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Feather } from "react-icons/io5";
import { IoLocationSharp as MapPin } from "react-icons/io5";

const Company = () => {
  const router = useRouter();
  const [MapContainer, setMapContainer] = useState(null);

  useEffect(() => {
    import("react-leaflet").then((module) => {
      setMapContainer(module.MapContainer);
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && MapContainer) {
      import("leaflet").then((L) => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
          iconUrl: require("leaflet/dist/images/marker-icon.png").default,
          shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
        });
      });
    }
  }, [MapContainer]);

  const products = [
    {
      quantity: "500ml",
      name: "Our largest package",
    },
    {
      quantity: "250ml",
      name: "Our second largest package",
    },
    {
      quantity: "100ml",
      name: "Our smallest package",
    },
  ];

  return (
    <div className="flex-1 bg-white pt-8 px-3">
      <h2 className="text-2xl font-bold">Maziwa Industries LTD</h2>
      <p className="text-gray-500 text-sm">Joined Monday, January 25, 2021</p>

      <div className="mt-2 flex-row justify-between">
        <button
          className="bg-[#2DABB1] px-8 py-2 rounded-full"
          onClick={() => router.push("/issue")}
        >
          <span className="font-semibold text-white">Raise an issue</span>
        </button>

        <button
          className="px-8 py-2 flex-row items-center justify-center space-x-2 border border-gray-300 rounded-full"
          onClick={() => router.push("/chat")}
        >
          <span className="text-[#2DABB1] font-semibold">Chat</span>
          {/* <Feather name="send" size={14} color="#2DABB1" className="rotate-90" /> */}
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Our popular products</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {products.map((product, index) => (
            <div key={index} className="w-32 mt-2">
              <div className="h-32 w-32 rounded bg-black" />
              <span className="font-bold">{product.quantity}</span>
              <span className="text-sm text-gray-700">{product.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div>
            {MapContainer && typeof window !== "undefined" && (
              <MapContainer
                center={[0, 0]}
                zoom={5}
                style={{ width: "100%", height: "200px" }}
              >
                         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[0, 0]} icon={<MapPin />} />
              </MapContainer>
            )}
          </div>

          <h4 className="font-bold text-xl mt-2">Nairobi, Kenya</h4>
          <p className="text-sm text-gray-500">View the location of this company</p>
        </div>
      </div>
    </div>
  );
};

export default Company;
