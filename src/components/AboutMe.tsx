import { Link, User } from "@nextui-org/react";

export default function App() {
  return (
    <>
      <User
        name="Matías Acebal"
        description={
          <>
            FullStack developer
            <Link
              href="https://github.com/dest92"
              size="sm"
              isExternal
              className="block"
            >
              @dest92
            </Link>
          </>
        }
        avatarProps={{
          name: "M",
        }}
        className="pt-20"
      />
    </>
  );
}
