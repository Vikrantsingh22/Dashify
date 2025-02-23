// import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BellIcon, EyeOffIcon, PersonStandingIcon } from "lucide-react";

export function DemoNotifications() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <BellIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Everything</p>
            <p className="text-sm text-muted-foreground">
              Email digest, mentions & all activity.
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
          <PersonStandingIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Available</p>
            <p className="text-sm text-muted-foreground">
              Only mentions and comments.
            </p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <EyeOffIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Ignoring</p>
            <p className="text-sm text-muted-foreground">
              Turn off all notifications.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
