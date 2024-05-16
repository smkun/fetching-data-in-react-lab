import React, { useEffect, useState } from "react";
import { fetchDataByUrl } from "../services/swapiService";

const DataDetails = ({ item, onBack, category }) => {
    const [details, setDetails] = useState(item);

    useEffect(() => {
        const fetchRelatedData = async () => {
            const updatedDetails = { ...item };
            const fetchFields = [
                "residents",
                "films",
                "species",
                "homeworld",
                "vehicles",
                "starships",
                "people",
                "pilots",
            ];

            for (const field of fetchFields) {
                if (item[field]) {
                    if (Array.isArray(item[field])) {
                        const promises = item[field].map((url) =>
                            fetchDataByUrl(url)
                        );
                        const data = await Promise.all(promises);
                        updatedDetails[field] = data.map(
                            (entry) => entry.name || entry.title
                        );
                    } else {
                        const data = await fetchDataByUrl(item[field]);
                        updatedDetails[field] = data.name || data.title;
                    }
                }
            }

            if (
                category === "people" &&
                (!updatedDetails.species || updatedDetails.species.length === 0)
            ) {
                updatedDetails.species = ["Human"];
            }

            delete updatedDetails.created;
            delete updatedDetails.edited;
            delete updatedDetails.url;

            setDetails(updatedDetails);
        };

        fetchRelatedData();
    }, [item, category]);

    if (!details) return null;

    const renderDetails = () => {
        return Object.entries(details).map(([key, value]) => {
            if (category !== "people" && key === "species") return null;
            return (
                <p key={key}>
                    <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                    {Array.isArray(value)
                        ? value.join(", ")
                        : value !== null && value !== undefined
                        ? value.toString()
                        : ""}
                </p>
            );
        });
    };

    return (
        <section>
            <button onClick={onBack}>Back</button>
            <h2>Details</h2>
            {renderDetails()}
        </section>
    );
};

export default DataDetails;
