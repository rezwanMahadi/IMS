import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TagLebel(props) {
    return (
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">RFID Tag</Label>
            <Input type="text" value={`${props.value}`} readOnly placeholder="Tag will appear here automatic" className="bg-white"/>
        </div>
    );
}
