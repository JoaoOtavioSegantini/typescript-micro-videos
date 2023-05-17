import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProps } from "./category";
import { omit } from "lodash";

describe("Category", () => {
  test("construct of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at", "updated_at", "deleted_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    category = new Category({
      name: "Category 1",
      description: "a simple description",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    expect(category.name).toBe("Category 1");
    expect(category.description).toBe("a simple description");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeDefined();
    expect(category.updated_at).toBeDefined();
    expect(category.created_at).toBeInstanceOf(Date);
    expect(category.updated_at).toBeInstanceOf(Date);
    expect(category.deleted_at).toBeNull();

    let now = new Date();
    category = new Category({
      name: "Category 1",
      description: "a simple description",
      is_active: false,
      created_at: now,
      updated_at: now,
    });

    expect(category.props).toStrictEqual({
      name: "Category 1",
      description: "a simple description",
      is_active: false,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    });

    category = new Category({
      name: "Category 1",
      description: "a simple description",
      is_active: false,
    });

    now = new Date();

    expect(category.props).toStrictEqual({
      name: "Category 1",
      description: "a simple description",
      is_active: false,
      created_at: now,
      updated_at: now,
      deleted_at: null,
    });
  });
  test("getter and setter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");

    category["name"] = "other name";
    expect(category.name).toBe("other name");
  });

  test("getter and setter of description prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "some description",
    });
    expect(category.description).toBe("some description");

    category = new Category({
      name: "Movie",
    });

    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: false,
    });
    expect(category.is_active).toBeFalsy();
  });

  test("getter of created_at prop", () => {
    let category = new Category({
      name: "Movie",
    });

    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.created_at).toBe(created_at);
  });
  test("getter of updated_at prop", () => {
    let category = new Category({
      name: "Movie",
    });

    expect(category.updated_at).toBeInstanceOf(Date);

    let updated_at = new Date();
    category = new Category({
      name: "Movie",
      updated_at,
    });
    expect(category.updated_at).toBe(updated_at);
  });
  describe("id field", () => {
    type CategoryData = { props: CategoryProps; id?: UniqueEntityId };
    const arrange: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    test.each(arrange)("when props is %j", (item) => {
      const category = new Category(item.props, item.id);
      expect(category.id).not.toBeNull();
      expect(category.entityId).toBeInstanceOf(UniqueEntityId);
    });
  });
  test("Category update", () => {
    let created_at = new Date();

    const category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.name).toBe("Movie");
    expect(category.created_at).toBe(created_at);
    expect(category.description).toBeNull();
    expect(category.updated_at).toEqual(created_at);
    expect(category.deleted_at).toBeNull();

    const name = "New movie";
    const description = "new movie description";

    jest.useFakeTimers();
    jest.advanceTimersByTime(250);

    category.update(name, description);
    expect(category.name).toBe(name);
    expect(category.description).toBe(description);
    expect(category.updated_at > created_at).toBeTruthy();
    expect(category.deleted_at).toBeNull();
  });
  test("Category activate", () => {
    let created_at = new Date();

    const category = new Category({
      name: "Movie",
      created_at,
      is_active: false,
      deleted_at: new Date(),
    });

    expect(category.name).toBe("Movie");
    expect(category.created_at).toBe(created_at);
    expect(category.is_active).toBeFalsy();

    jest.useFakeTimers();
    jest.advanceTimersByTime(250);

    category.activate();

    expect(category.is_active).toBeTruthy();
    expect(category.name).toBe("Movie");
    expect(category.updated_at > created_at).toBeTruthy();
    expect(category.deleted_at).toBeNull();
  });
  test("Category deactivate", () => {
    let created_at = new Date();

    const category = new Category({
      name: "Movie",
      created_at,
      is_active: true,
    });

    expect(category.name).toBe("Movie");
    expect(category.created_at).toBe(created_at);
    expect(category.is_active).toBeTruthy();

    jest.useFakeTimers();
    jest.advanceTimersByTime(250);

    category.deactivate();

    expect(category.is_active).toBeFalsy();
    expect(category.name).toBe("Movie");
    expect(category.updated_at > created_at).toBeTruthy();
    expect(category.deleted_at).toEqual(category.updated_at);
  });
});
