import { useSelector } from "react-redux";
import PurchaseCredit from "./PurchaseCredit";
import Subscription from "./Subscription";
import PendingConfirmation from "./PendingConfirmation";



function ManagePayments() {
    const userDetails = useSelector((state) => state.userDetails);
    const confirmationStatus = [
        'created',
        'pending',
        'authenticated'
    ];

    const pendingStatuses = ['created', 'authenticated'];
    const isPending = pendingStatuses.includes(userDetails?.subscription?.status);

    if (isPending) {
        return (
            <div className="container py-5">
                <div className="alert alert-info text-center">
                    We're confirming the status of your payment. This may take up to 5 minutes.
                </div>
            </div>
        );
    }

    if (userDetails.subscription?.status === 'active') {
        return <Subscription />;
    } else if (confirmationStatus.includes(userDetails.subscription?.status)) {
        return <PendingConfirmation />;
    }
    else {
        return <PurchaseCredit />;
    }
}

export default ManagePayments;