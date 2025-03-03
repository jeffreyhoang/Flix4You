import React, { useState } from "react";
import { fetchSubscription } from "../api";

const SubscriptionButton = () => {
    const [subscriptions, setSubscriptions] = useState([]); // Change to array
    const [showSubscription, setShowSubscription] = useState(false);

    const handleShowSubscription = async () => {
        const data = await fetchSubscription(); // Call API function
        setSubscriptions(data); // Set the array of subscriptions
        setShowSubscription(!showSubscription);
    };

    return (
        <div>
            <button onClick={handleShowSubscription}>
                {showSubscription ? "Hide Subscription" : "Show Subscription"}
            </button>

            {showSubscription && (
                <>
                    <h3>Subscription Details</h3>
                    {subscriptions.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map((subscription) => (
                                    <tr key={subscription.id}>
                                        <td>{subscription.start_date}</td>
                                        <td>{subscription.end_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No active subscription found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SubscriptionButton;