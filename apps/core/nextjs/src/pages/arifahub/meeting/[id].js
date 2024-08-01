import { fields } from "../../../../../../custom/arifahub/arifahub/doc/meeting/fields.js";

import { useRouter } from "next/router";

export default function Doc() {
  console.log(fields);
  const router = useRouter();
  const { id } = router.query;
  return <div>Doc Page: {id}</div>;
}
